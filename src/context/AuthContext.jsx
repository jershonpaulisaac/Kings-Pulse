import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        console.log("AuthContext: Initiating connection...");

        const initSession = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                if (error) throw error;
                if (isMounted) {
                    console.log("AuthContext: Session retrieved", session?.user?.id || "No user");
                    setUser(session?.user ?? null);
                }
            } catch (err) {
                console.error("AuthContext: Session retrieval failed", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        initSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log("AuthContext: Auth state changed", _event);
            if (isMounted) {
                setUser(session?.user ?? null);
                setLoading(false);
            }
        });

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-raisin flex flex-col items-center justify-center p-8">
                <div className="w-16 h-16 border-4 border-lavender border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-lavender font-black tracking-[0.3em] uppercase text-xs">Synchronizing Identity...</p>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
