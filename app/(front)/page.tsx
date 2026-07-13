import type { CSSProperties } from "react";

export default function HomePage() {
    return (
        <section style={styles.content}>
          <div style={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Learn more about Next.js features and API.</p>
          </div>
  
          <div style={styles.card}>
            <h3>Deploy &rarr;</h3>
            <p>Instantly deploy your Next.js site to a public URL.</p>
          </div>
        </section>
  
        
    );
  }
  
  const styles: Record<string, CSSProperties> = {
    container: {
      fontFamily: 'system-ui, sans-serif',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      backgroundColor: '#fafafa',
      color: '#333',
    },
    header: {
      textAlign: 'center',
      marginBottom: '3rem',
    },
    content: {
      display: 'flex',
      gap: '1.5rem',
      maxWidth: '800px',
      width: '100%',
    },
    card: {
      flex: 1,
      padding: '1.5rem',
      border: '1px solid #eaeaea',
      borderRadius: '8px',
      backgroundColor: '#fff',
      cursor: 'pointer',
      transition: 'border-color 0.2s',
    },
    footer: {
      marginTop: 'auto',
      paddingTop: '2rem',
      fontSize: '0.9rem',
      color: '#666',
    },
  };