import { client } from './client';

export const fetchStudyRoomList = () => client.get('/rooms');
