import * as React from 'react';
import * as style from './style.scss';

interface HomeProps {}

interface HomeState {
}

export class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
  }

  readonly state: HomeState = {
  }

  render() {
    return (
      <div className={style.container}>
        <div className={style.wrapper}>
          Mohsen
        </div>
      </div>
    );
  }
}
