import React, {useContext, useState} from 'react';

import Button from '../Button';
import ToastShelf from '../ToastShelf';

import styles from './ToastPlayground.module.css';
import { ToastContext } from '../ToastProvider';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {

  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState(VARIANT_OPTIONS[0]);

  const { createToast, setToasts, closeToast } = useContext(ToastContext);

  const setMessageHandler = (e) => {
    setMessage(e.target.value);
  }

  const radioChangeHandler = (e) => {
    setVariant(e.target.value);
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();

    createToast(message, variant);
    setMessage('');
    setVariant(VARIANT_OPTIONS[0]);
  }

  return (
      <div className={styles.wrapper}>
        <header>
          <img alt="Cute toast mascot" src="/toast.png" />
          <h1>Toast Playground</h1>
        </header>

        <ToastShelf />

          <form
              className={styles.controlsWrapper}
              onSubmit={(e) => formSubmitHandler(e)}
          >
            <div className={styles.row}>
              <label
                  htmlFor="message"
                  className={styles.label}
                  style={{ alignSelf: 'baseline' }}
              >
                Message
              </label>
              <div className={styles.inputWrapper}>
              <textarea
                  id="message"
                  value={message}
                  className={styles.messageInput}
                  onChange={(e) => setMessageHandler(e)}
              />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.label}>Variant</div>
              <div
                  className={`${styles.inputWrapper} ${styles.radioWrapper}`}
              >
                {/* TODO Other Variant radio buttons here */}
                {
                  VARIANT_OPTIONS.map((option) => {

                    const identifier = `variant-${option}`;

                    return (
                        <label htmlFor={identifier} key={identifier}>
                          <input
                              id={identifier}
                              type="radio"
                              name="variant"
                              value={option}
                              checked={option === variant}
                              onChange={ (e) => radioChangeHandler(e)}
                          />
                          {option}
                        </label>
                    )
                  })
                }

              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label} />
              <div
                  className={`${styles.inputWrapper} ${styles.radioWrapper}`}
              >
                <Button>
                  Pop Toast!
                </Button>
              </div>
            </div>
        </form>
      </div>
);
}

export default ToastPlayground;