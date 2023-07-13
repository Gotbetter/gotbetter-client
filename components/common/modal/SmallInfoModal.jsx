import PropTypes from 'prop-types';
import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

SmallInfoModal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  visible: PropTypes.bool,
  onRequestClose: PropTypes.func,
};

function SmallInfoModal({ children, visible, onRequestClose }) {
  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onRequestClose}>
      <View style={styles.outerView}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#9797979C',
  },

  modalView: {
    width: wp(78),
    height: hp(32),
    borderRadius: 10,
    backgroundColor: '#ffffff',

    justifyContent: 'center',
    alignItems: 'center',

    padding: RFValue(12),
    marginBottom: hp(8),
  },
});

export default SmallInfoModal;
