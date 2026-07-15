const PLANETA_LIBRO_LOGO_URL = "https://planetalibro.net/img/icono40.png";

export function ReaderBrandBar() {
  return (
    <header className="reader-brand-bar">
      <div className="reader-brand-bar-content">
        <img className="reader-brand-logo" src={PLANETA_LIBRO_LOGO_URL} alt="PlanetaLibro" />
        <span className="reader-brand-domain" aria-hidden="true">PlanetaLibro.com</span>
      </div>
    </header>
  );
}
