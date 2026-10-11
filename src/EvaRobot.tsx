import './EvaRobot.css';

/** CSS 3D EVA robot — from Uiverse.io by Subaashbala */
export function EvaRobot() {
  return (
    <div className="modelViewPort" aria-hidden="true">
      <div className="eva">
        <div className="head">
          <div className="eyeChamber">
            <div className="eye" />
            <div className="eye" />
          </div>
        </div>
        <div className="body">
          <div className="hand" />
          <div className="hand" />
          <div className="scannerThing" />
          <div className="scannerOrigin" />
        </div>
      </div>
    </div>
  );
}
