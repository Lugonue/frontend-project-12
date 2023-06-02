import AddModal from "./AddChannel";
import DeleteModal from "./DeleteModal";
import RenameModal from "./RenameModale";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions as modalsActions } from "../../slices/modalsSlice";




export default ({t, toast}) => {

  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modals);



  return (
    <>
      <AddModal show={modalState.showAddModal} handleClose={() => dispatch(modalsActions.togleAddModal())} t={t} toast={toast} />
      <RenameModal show={modalState.showRenameModal} handleClose={() => dispatch(modalsActions.togleRenameModal(modalState.renameChannelId))} t={t} toast={toast} />
      <DeleteModal show={modalState.showDeleteModal} handleClose={() => dispatch(modalsActions.togleDeleteModal(modalState.deleteChannelId))} t={t} toast={toast} />
    </>

  )

}