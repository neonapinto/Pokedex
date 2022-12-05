import React,{FC, } from 'react'
import ReactDOM from 'react-dom';
import { IModalProps } from '../../utils/Interfaces';




const Modal:FC<IModalProps> = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
 
    <div className='modal-container'>
      <div className="modal-overlay"/>
      <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal">
          <div className="modal-header">
            <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <p>
              Your submission is successful!
          </p>
        </div>
      </div>
    </div>, document.body
  ) : null;

export default Modal