"use client";

import { useEffect } from "react";

export default function TwentyFirstToolbarWrapper() {
  useEffect(() => {
    // Only initialize in development mode
    if (process.env.NODE_ENV === "development") {
      const initializeToolbar = async () => {
        try {
          // Use the framework-agnostic approach
          const { initToolbar } = await import("@21st-extension/toolbar");
          
          // Initialize toolbar with basic configuration
          initToolbar({
            plugins: [], // Add custom plugins here if needed
          });
          
          console.log("✅ 21st.dev Toolbar initialized successfully using framework-agnostic approach");
        } catch (error) {
          console.warn("❌ Failed to initialize 21st.dev Toolbar:", error);
        }
      };
      
      // Small delay to ensure DOM is ready
      setTimeout(initializeToolbar, 100);
    }
  }, []);

  // This component doesn't render anything - the toolbar is injected by initToolbar()
  return null;
}
