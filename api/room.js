import { client } from './client';

const fetchStudyRoomList = () => client.get('/rooms');

const fetchStudyRoomRuleList = () => client.get('/common/rules');

const fetchStudyRoomDetail = (roomId) => client.get(`/rooms/${roomId}`);

const fetchStudyRoomParticipants = (roomId, accepted) =>
  client.get(`/participants/${roomId}`, { params: { accepted } });

const fetchStudyRoomRank = (room_id) => client.get(`/rooms/${room_id}/rank`);

const createStudyRoomRequest = (request) => client.post('/rooms', request);

export {
  fetchStudyRoomList,
  fetchStudyRoomRuleList,
  fetchStudyRoomDetail,
  fetchStudyRoomParticipants,
  fetchStudyRoomRank,
  createStudyRoomRequest,
};
