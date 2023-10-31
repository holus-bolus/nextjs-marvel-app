import styles from './page.module.css';
import md5 from 'md5';
import Link from 'next/link'; // Import the Link component

export default function Home() {
    const publicKey = '05055e60346d1b1668ad50134bcbabd4';
    const privateKey = '17f5d4f21719eb6d670b0db4cde5a61d6164dfe8';
    const apiBaseURL = 'https://gateway.marvel.com/v1/public';

    function createURL() {
        const ts = Date.now();
        const hash = md5(ts + privateKey + publicKey);
        const url = `${apiBaseURL}/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
        return url;
    }

    const fetchData = async () => {
        try {
            const url = createURL();
            const response = await fetch(url);
            console.log('Response status:', response.status);
            if (response.ok) {
                const data = await response.json();
                const characters = data.data.results;
                console.log(characters);
                // Render the characters on the page
                const characterList = characters.map((character) => (
                    <li key={character.id}>
                        {/* Use the Link component to create a link to the character's page */}
                        <Link href="/characters/[id]" as={`/characters/${character.id}`} legacyBehavior>
                            <a>{character.name}</a>
                        </Link>
                    </li>
                ));

                // Render the character list on the page
                return (
                    <main className={styles.main}>
                        <h1 style={{ color: 'white' }}>Hello world</h1>
                        <ul>{characterList}</ul>
                    </main>
                );
            } else {
                console.error('API request failed with status:', response.status);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return fetchData();
}
