interface Props {
    coverUrl: string | undefined;
    name: string | undefined;
}

function GameCard( { coverUrl, name}: Props) {

    if (!coverUrl || !name) {
        coverUrl = "";
        name = "";
    }

    return (
        <>
            <img className={"insert-0 z-10"} src={coverUrl} alt={name} height={374} width={264}/>
        </>
    )
}

export default GameCard
