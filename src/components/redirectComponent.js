(() => ({
  name: 'RedirectComponent',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env } = B;
    const isDev = env === 'dev';

    function devEnvironment() {
      return (
        <div>
          <div className={classes.root}>Redirect component</div>
        </div>
      );
    }

    function prodEnvironment() {
      return (
        <div>
          <a className={classes.root} href="https://google.com">
            Redirect me!
          </a>
        </div>
      );
    }

    return isDev ? devEnvironment() : prodEnvironment();
  })(),
  styles: B => theme => {
    const style = new B.Styling(theme);
    return {
      root: {
        color: style.getColor('primairy'),
      },
    };
  },
}))();
