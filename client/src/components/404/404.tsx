function C404(){
    return (
        <div className="page page--404">
          <main className="page__main page__main--404">
            <div className="container">
              <article className="error-card">
                <div className="error-card__content">
                  <h1 className="error-card__title">404</h1>
                  <div className="error-card__info">
                    <div className="error-card__message-wrapper">
                      <p className="error-card__message">Page not found</p>
                      <p className="error-card__description">
                        The page you are looking for might be temporarily unavailable or does not exist.
                      </p>
                    </div>
                    <a className="error-card__link" href="/">
                      <span className="error-card__link-text">Go to main page</span>
                      <svg className="error-card__icon" width="18" height="19">
                        <use xlinkHref="#icon-arrow-right"></use>
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </main>
        </div>
      );
}
export {C404}