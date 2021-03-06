/* eslint-disable no-restricted-globals */
import * as React from "react";

class NetworkStatus extends React.Component {
  state = {
    online: "onLine" in navigator ? navigator.onLine : true
  };

  componentDidMount() {
    addEventListener("offline", this.updateOnlineStatus);
    addEventListener("online", this.updateOnlineStatus);
    this.updateOnlineStatus();
  }

  componentWillUnmount() {
    removeEventListener("offline", this.updateOnlineStatus);
    removeEventListener("online", this.updateOnlineStatus);
  }

  updateOnlineStatus = () => {
    if (this.props.cb) {
      this.props.cb(navigator.onLine);
    }
    this.setState({ online: navigator.onLine });
  };

  render() {
    return this.props.children(this.state.online);
  }
}

export default NetworkStatus;
