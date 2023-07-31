import React from 'react';

import preloader from '../assets/img/Iphone-spinner-2.gif'

const Preloader = ({fetching}) => {
    return (
        <div className={fetching ? `preloader` : `hide-preloader remove-preloader`}>
          <img src={preloader} alt="preloader" />
        </div>
    );
}

export default Preloader;
