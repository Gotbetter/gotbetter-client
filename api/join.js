import { client } from './client';

export const joinRequest = (room_code) => client.post('/participants', { room_code });
