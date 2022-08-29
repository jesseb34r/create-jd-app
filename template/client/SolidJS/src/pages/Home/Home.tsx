import { Component, onMount } from "solid-js";
import { trpc } from "~/utils/trpc";

interface IHomeProps { };

const Home: Component<IHomeProps> = ({ }) => {
    const [response] = trpc.useQuery("example.test", { name: "example" });
    const [useMutationExample, currentState] = trpc.useMutation("example.mTest", {
        onSuccess: (data, variables) => {
            console.log({ weSuccessSo: { data, variables } });
        }
    });
    const [prismaMutate] = trpc.useMutation("example.prisma", {
        onSuccess: (data, variables) => {
            console.log({ prisma: true, weSuccessSo: { data, variables } });
        }
    });

    onMount(() => {
        (async () => {
            try {
                const response = await useMutationExample({ number: 1 });
                const second = await prismaMutate({ text: "hey" });
                console.log({ response, second })
            } catch (e) {
                console.log(e);
            }
        })()
    })

    return (
        <div>
            <h1>{response() ?? "no data || yet"}</h1>
            <h1>{currentState().loading ? "loading..." : currentState().data ?? "no data"}</h1>
            <h1>keys length</h1>
            <h2>{Object.keys(trpc).length}</h2>
        </div>
    )
}

export default Home;