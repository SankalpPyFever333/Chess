import { useEffect, useState  } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
interface Game {
	game_id: number;
	opponent_email: string;
	winner: string | null;
}
function MyGames() {
	const { user } = useAuthContext()
	const [gamelist, setGamelist] = useState<Game[]>([])

	const fetchGames = async () =>{
		console.log('fetching my games...');
		const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/games`, {
			method: 'GET',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
		});
		const json = await response.json();
		
		if (response.ok) {
			setGamelist(json.games);
		} else {
			if (json.error === 'TokenExpiredError') {
				console.log('access token has expierd ,asking for renew token');
				const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/renew-token`, {
					method: 'GET',
					credentials: 'include',
					headers: { 'Content-Type': 'application/json' },
				});
				if (response.ok) {
                    console.log('retrying again fetching my games...');
					fetchGames();
				} else {
					const json = await response.json()
					console.log('error occured while refreshing the token: ',json.error);
				}
			}
		}
	}

	useEffect(() => {
		fetchGames()
	}, [])
	
	
	return (
		<div className='my-games'>
			<h1>My Games</h1>
			<div className="list">
				<ul>
					<li className="header">
						<div className="serial-no">S.No</div>
						<div className="opponent">Opponent</div>
						<div className="winner">Winner</div>
					</li>
					{gamelist.map((game, index) => (
						<li key={index} className="game">
							<div className="number">{`${index+1}.`}</div><div className="email">{game.opponent_email}</div><div className="winner">{game.winner === user?.email ? 'You' : 'Opponent'}</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default MyGames