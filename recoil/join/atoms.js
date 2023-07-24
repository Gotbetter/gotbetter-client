import { atom } from 'recoil';

const joinRequestState = atom({
  key: 'joinError',
  default: false,
});

const joinRequestMessage = atom({
  key: 'joinErrorMessage',
  default: '',
});

const joinRequestModalState = atom({
  key: 'joinRequestModalState',
  default: false,
});

export { joinRequestState, joinRequestModalState, joinRequestMessage };
