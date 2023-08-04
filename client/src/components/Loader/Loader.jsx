import {ProgressBar} from 'react-loader-spinner';
import styles from "./Loader.module.css";

function Loader({msg}) {
  return (
    <div className={styles.loaderWrapper}>
        <h2>Loading {msg}...</h2>
        <ProgressBar 
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor = '#F4442E'
        barColor = 'steelBlue'
        />
    </div>
  )
}

export default Loader