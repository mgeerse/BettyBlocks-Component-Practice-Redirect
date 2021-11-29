(() => ({
  name: 'RedirectComponent',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, useEndpoint } = B;
    const { Button } = window.MaterialUI.Core;
    const {
      linkType,
      linkToInternal,
      linkToExternal,
      redirectButtonText,
    } = options;

    const isDev = env === 'dev';

    // eslint-disable-next-line no-undef
    const history = isDev ? null : useHistory();

    const hasExternalLink =
      linkType === 'external' && linkToExternal && linkToExternal.id !== '';
    const hasInternalLink =
      linkType === 'internal' && linkToInternal && linkToInternal.id !== '';

    const internalEndpoint = hasInternalLink && useEndpoint(linkToInternal);

    B.defineFunction('redirectFunction', e => {
      console.log('redirectFunction FIRED!');
      if (hasInternalLink) {
        return history.push(internalEndpoint);
      }
      if (hasExternalLink) {
        return window.location.replace(linkToExternal);
      }
      if (linkType === 'action') {
        return window.location.replace(e);
      }
      return null;
    });

    function componentDescription() {
      return (
        <>
          <h1 className={classes.root}>Redirect component.</h1>
          <pre>Doing a redirect to an {linkType} page.</pre>
        </>
      );
    }

    function devEnvironment() {
      return (
        <div>
          {componentDescription()}
          <Button>{redirectButtonText}</Button>
        </div>
      );
    }

    function prodEnvironment() {
      return (
        <div>
          {componentDescription()}
          <Button
            onMouseEnter={() => {
              console.log('y0');
              B.triggerEvent('redirectFunction');
            }}
          >
            {redirectButtonText}
          </Button>
        </div>
      );
    }

    return isDev ? devEnvironment() : prodEnvironment();
  })(),
  styles: B => theme => {
    const style = new B.Styling(theme);
    return {
      root: {
        color: style.getColor('Primary'),
      },
    };
  },
}))();
