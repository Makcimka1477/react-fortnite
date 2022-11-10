import React,{ Component,logErrorToExampleService } from 'react';
import notFound404 from '../../images/notFound404.webp';

class ErrorBoundary extends Component {
    state = {
        error: null,
    };

    static getDerivedStateFromError (error) {
        return { error: error };
    }

    componentDidCatch (error,info) {
        logErrorToExampleService(error,info);
    }

    render () {
        if (this.state.error) {
            return <div>
                <p style={{ fontSize: '30px',fontWeight: 700,}}>
                    Something broke
                </p>
                <div>
                    <img src={notFound404} alt='404error' />
                </div>
            </div>
        }
        return this.props.children;
    }
}
export default ErrorBoundary;