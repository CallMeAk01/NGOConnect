import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

@Controller('ngos')
export class ReviewsController {
    constructor(private readonly prisma: PrismaService) {}

    @Get(':id/reviews')
    async getReviews(@Param('id') ngoId: string) {
        const reviews = await this.prisma.review.findMany({
            where: { ngoId },
            include: {
                user: { select: { id: true, name: true, avatar: true } }
            },
            orderBy: { createdAt: 'desc' }
        });

        const avgRating = reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;

        return { reviews, avgRating: Math.round(avgRating * 10) / 10, total: reviews.length };
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/reviews')
    async submitReview(
        @Param('id') ngoId: string,
        @Request() req: any,
        @Body() body: { rating: number; comment?: string }
    ) {
        const { rating, comment } = body;

        if (!rating || rating < 1 || rating > 5) {
            throw new Error('Rating must be between 1 and 5');
        }

        // Check NGO exists
        const ngo = await this.prisma.nGOProfile.findUnique({ where: { id: ngoId } });
        if (!ngo) throw new Error('NGO not found');

        // Upsert: one review per user per NGO
        const review = await this.prisma.review.upsert({
            where: { ngoId_userId: { ngoId, userId: req.user.id } },
            update: { rating, comment: comment || null },
            create: { ngoId, userId: req.user.id, rating, comment: comment || null }
        });

        // Recalculate NGO average rating
        const allReviews = await this.prisma.review.findMany({ where: { ngoId } });
        const avg = allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length;
        await this.prisma.nGOProfile.update({
            where: { id: ngoId },
            data: { rating: Math.round(avg * 10) / 10 }
        });

        return review;
    }
}
