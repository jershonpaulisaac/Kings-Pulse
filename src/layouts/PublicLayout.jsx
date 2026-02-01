import React from 'react';

const PublicLayout = ({ children }) => {
    return (
        <div className="theme-public min-h-screen">
            {children}
        </div>
    );
};

export default PublicLayout;
