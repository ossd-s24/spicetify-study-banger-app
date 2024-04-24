//Issue is currently working with Spotify API bipassing the setup of Spicetify internal API wrapper. need to rewrite for that.


class SpotifyService {
  constructor() {}

  // Fetch the Spotify access token from the Spicetify client using type assertion
  static getAccessToken(): string {
    // Asserting Spicetify as any to bypass TypeScript type checking
    const accessToken = (window as any).Spicetify?.AccessToken;
    if (!accessToken) {
      throw new Error("Access Token is not available.");
    }
    return accessToken;
  }

  //pulling users playlists
  static async getUserPlaylists() {
    const accessToken = this.getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/me/playlists`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data.items;
  }

  // Search for playlists using Spotify's Search API
  static async searchPlaylists(query: string) {
    const accessToken = SpotifyService.getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    if (!data.playlists) throw new Error("Failed to fetch playlists.");
    return data.playlists.items;
  }

  // Start playback of a playlist
  static async playPlaylist(playlistId: string) {
    const accessToken = SpotifyService.getAccessToken();
    await fetch(`https://api.spotify.com/v1/me/player/play`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ context_uri: `spotify:playlist:${playlistId}` })
    });
  }
}

export default SpotifyService;
