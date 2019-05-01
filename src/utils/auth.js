import React, { Component } from 'react'

export const login = async ({ userId }) => {
  // cookie.set('userId', userId, { expires: 1 })
  // Router.push('/home')
}

export const logout = () => {
  // cookie.remove('userId')
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now())
  // Router.push('/login')
}

// Gets the display name of a JSX component for dev tools
const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component'

export const withAuthSync = WrappedComponent =>
  class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`

    static async getInitialProps(ctx) {
      const userId = getUserId(ctx)

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx, userId))

      return { ...componentProps, userId }
    }

    constructor(props) {
      super(props)

      this.syncLogout = this.syncLogout.bind(this)
    }

    componentDidMount() {
      window.addEventListener('storage', this.syncLogout)
    }

    componentWillUnmount() {
      window.removeEventListener('storage', this.syncLogout)
      window.localStorage.removeItem('logout')
    }

    syncLogout(event) {
      if (event.key === 'logout') {
        console.log('logged out from storage!')
        // Router.push('/login')
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

export const getUserId = ctx => {
  const { userId } = '1024'

  /*
   * This happens on server only, ctx.req is available means it's being
   * rendered on server. If we are on server and userId is not available,
   * means user is not logged in.
   */
  if (ctx.req && !userId) {
    ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end()

    return
  }

  // We already checked for server. This should only happen on client.
  if (!userId) {
    // Router.push('/login')
  }

  return userId
}


export function getPersonId () {
  const personId = +localStorage.getItem('user_id')
  if (!personId) throw new Error('person id does not exists', personId)

  return personId
}