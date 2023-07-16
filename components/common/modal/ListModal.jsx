import PropTypes from 'prop-types';
import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

ListModal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  visible: PropTypes.bool,
  onRequestClose: PropTypes.func,
};

function ListModal({ children, visible, onRequestClose }) {
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
    borderRadius: 10,
    backgroundColor: '#ffffff',

    justifyContent: 'center',
    padding: RFValue(18),
  },
});

export default ListModal;
