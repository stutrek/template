import Intro from './Intro.mdx';
import { Header } from './header';
export default function () {
    return (
        <div className="container max-w-3xl mx-auto prose p-4">
            <div className="text-center">
                Image?
                <Header showLogo={false} />
            </div>
            <Intro />
        </div>
    );
}
