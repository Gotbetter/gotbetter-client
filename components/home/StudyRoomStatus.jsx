import PropTypes from 'prop-types';
import React from 'react';

import { End, Progress, Wait } from './status';

StudyRoomStatus.propTypes = {
  status: PropTypes.string,
  startDate: PropTypes.string,
};

function StudyRoomStatus({ status, startDate }) {
  if (status === 'WAIT') return <Wait startDate={startDate} />;
  if (status === 'PROGRESS') return <Progress />;
  if (status === 'END') return <End />;
}

export default StudyRoomStatus;
