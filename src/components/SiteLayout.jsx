import { Outlet } from 'react-router-dom';
import backgroundVideo from '../../asset/untitled_project_remix_scene.mp4';
import SiteHeader from './SiteHeader';

export default function SiteLayout() {
  return (
    <main className="app">
      <video
        className="app__video"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className="app__canvas">
        <SiteHeader />
        <Outlet />
      </div>
    </main>
  );
}
