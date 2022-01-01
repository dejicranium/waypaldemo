import { useRouter } from 'next/router';
import { destroyCookie, setCookie } from 'nookies';
import React, { Component, createContext, useContext } from 'react';
import { init } from '../../store';

export const persist = (payload) => {
  try {
    if (localStorage) {
      localStorage.setItem('data', JSON.stringify(payload));
    }
  } catch (e) {}
};

export const getItem = () => {
  try {
    const data = localStorage.getItem('data');
    if (data) return JSON.parse(data);
    persist(init);
    return init;
  } catch (e) {
    return init;
  }
};

export const clear = () => {
  try {
    if (localStorage) {
      localStorage.clear();
    }
  } catch (e) {}
};

const AppContext = createContext({
  data: init,
  dispatch: (_) => {},
});

export class DataProvider extends Component {
  isMounted = false;

  constructor(props) {
    super(props);
    this.state = {};
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.isMounted = true;
    this.setState(getItem());
  }

  updateState(data) {
    this.setState({ ...this.state, ...data });
  }

  render() {
    return (
      <AppContext.Provider
        value={{ data: this.state, dispatch: this.updateState }}
      >
        {this.isMounted && this.props.children}
      </AppContext.Provider>
    );
  }
}

export default function useData() {
  const { push } = useRouter();
  const { data, dispatch } = useContext(AppContext);

  return {
    data,
    dispatch: (payload, logout = false) => {
      if (payload === 'clear') {
        clear();
        destroyCookie(null, 'token', { path:"/", });
        persist(init);
        
        dispatch(init);
        logout && push('/login');
      } else {
        if (payload.token) {
          setCookie(null, 'token', payload.token, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
            sameSite: 'lax',
            // httpOnly: process.env.NODE_ENV === 'production'
          });
        }

        const newState = {
          ...data,
          ...payload,
        };
        persist(newState);
        dispatch(payload);
      }
    },
  };
}
