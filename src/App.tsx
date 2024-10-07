import { useState } from "react";
import { Card, Grid, LoadingIndicator, Modal } from "./components";
import { Gif } from "./types";

function App() {
  const [loading, setLoading] = useState(false);
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [selectedGif, setSelectedGif] = useState<Gif | null>(null);

  return (
    <>
      <h1>React Card Grid Challenge</h1>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <Grid>
          {gifs.map((gif) => (
            <Card key={gif.id} gif={gif} onClick={setSelectedGif} />
          ))}
        </Grid>
      )}
      {selectedGif && (
        <Modal gif={selectedGif} onClose={() => setSelectedGif(null)} />
      )}
    </>
  );
}

export default App;
