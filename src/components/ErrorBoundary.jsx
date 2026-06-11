import { Component } from "react";
import PropTypes from "prop-types";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen bg-forest-50 p-6 text-forest-900">
          <section className="mx-auto max-w-xl rounded-2xl border border-forest-100 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-bold">Carbon Compass could not load</h1>
            <p className="mt-3 text-slate-700">
              Refresh the page to try again. No data has been sent anywhere.
            </p>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};
