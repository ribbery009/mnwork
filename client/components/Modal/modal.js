import React,{useState} from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const Modal = () => {
    const [open,setOpen] = useState(false);


  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

    return (
      <div style={styles}>
        <h2>react-responsive-modal</h2>
        <button onClick={onOpenModal}>Open modal</button>
        <Modal open={open} onClose={onCloseModal}>
          <h2>Simple centered modal</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
            hendrerit risus, sed porttitor quam.
          </p>
        </Modal>
      </div>
    );
  
}
export default Modal;