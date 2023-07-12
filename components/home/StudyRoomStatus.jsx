import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { End, Progress, Wait } from './status';

StudyRoomStatus.propTypes = {
  room: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    week: PropTypes.number,
    room_category: PropTypes.string,
    entry_fee: PropTypes.number,
    max_user_num: PropTypes.number,
    current_user_num: PropTypes.number,
  }),
};

function StudyRoomStatus({ room }) {
  const [status] = useState('PROGRESS');

  useEffect(() => {}, []);

  if (status === 'WAIT') return <Wait />;
  if (status === 'PROGRESS') return <Progress />;
  if (status === 'END') return <End />;
}

export default StudyRoomStatus;
