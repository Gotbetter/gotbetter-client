import { client } from './client';

export const fetchStudyRoomList = () => client.get('/rooms');

export const fetchStudyRoomRuleList = () => client.get('/common/rules');

export const createStudyRoomRequest = (request) => client.post('/rooms', request);
