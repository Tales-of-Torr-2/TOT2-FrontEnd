/* eslint-disable max-len */
import React from 'react'; 
import useGetUser from '../../hooks/useGetUser';
import { useHistory } from 'react-router-dom';
import { cutscene } from '../../data/cutscene';
import { useActiveSession, useContextGoogleId } from '../../hooks/SessionProvider';
import { useSetContextHero } from '../../hooks/HeroProvider';
import styles from './CutScene.css';

const CutScene = () => {
  const contextGoogleId = useContextGoogleId();
  const activeSession = useActiveSession();
  const { userObj, loading } = useGetUser(contextGoogleId);
  const history = useHistory(); 
  const setContextHero = useSetContextHero();

  if (!activeSession) history.push('/');

  if (loading) return <div>Loading...</div>;
  
  const onClick = () => {
    setContextHero(userObj?.heroStats);
    history.push('/tutorial');
  };

  return (
    <div className={styles['main-container']}>
      <div className={styles['parchment']}>
        <div className={styles['article-container']}>
          <article className={styles['first-article']}>
            {cutscene.intro}
          </article>
          <br />
          <article>{cutscene[userObj?.heroStats?.type]}</article>
        </div>
        <button onClick={onClick} className={styles['cutscene-button']}>
          <div className={styles['button-words-display']}>Begin Adverture</div>
        </button>
      </div>
    </div>
  );
};

export default CutScene;
