import { client } from './client';

const joinRequest = (room_code) => client.post('/participants', { room_code });

const acceptJoinRequest = (user_id, room_id) => client.patch('/participants', { user_id, room_id });

const rejectJoinRequest = (user_id, room_id) => client.post('/participants/reject', { user_id, room_id });

export { joinRequest, acceptJoinRequest, rejectJoinRequest };
