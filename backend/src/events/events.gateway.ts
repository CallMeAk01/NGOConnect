import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
    namespace: '/events',
})
export class EventsGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private readonly logger = new Logger(EventsGateway.name);

    afterInit() {
        this.logger.log('WebSocket Gateway initialized');
    }

    handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    // ─── Emit: New Case Created ────────────────────────────────────────
    emitCaseCreated(caseData: any) {
        this.server.emit('case:created', {
            event: 'case:created',
            data: caseData,
            timestamp: new Date().toISOString(),
        });
    }

    // ─── Emit: Case Status Updated ────────────────────────────────────
    emitCaseStatusUpdate(payload: {
        caseId: string;
        previousStatus: string;
        newStatus: string;
        updatedBy: string;
        updatedAt: string;
    }) {
        this.server.emit('case:statusUpdate', {
            event: 'case:statusUpdate',
            data: payload,
            timestamp: new Date().toISOString(),
        });
    }

    // ─── Emit: Critical Case Alert ──────────────────────────────────────
    emitCriticalCaseAlert(caseData: any, notifiedNgos: any[]) {
        this.server.emit('case:critical', {
            event: 'case:critical',
            data: { case: caseData, notifiedNgos },
            timestamp: new Date().toISOString(),
        });
    }

    // ─── Emit: Generic Notification ───────────────────────────────────
    emitNotification(channel: string, data: any) {
        this.server.emit(channel, {
            event: channel,
            data,
            timestamp: new Date().toISOString(),
        });
    }

    // ─── Emit: Case Escalated ────────────────────────────────────────
    emitCaseEscalated(payload: {
        caseId: string;
        previousNgoId: string;
        newNgoId: string;
        reason: string;
    }) {
        this.server.emit('case:escalated', {
            event: 'case:escalated',
            data: payload,
            timestamp: new Date().toISOString(),
        });
    }
}
