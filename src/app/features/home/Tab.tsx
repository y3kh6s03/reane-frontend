"use client"

import React from 'react';
import styles from './styles/Tab.module.scss';

export default function Tab() {
  return (
    <div className={styles.tab}>
      <button type='button' className={styles.tab_button}>
        My Model
      </button>
      <button type='button' className={styles.tab_button}>
        All Model
      </button>
      <span className={styles.tab_bottom_line} />
    </div>
  )

}
