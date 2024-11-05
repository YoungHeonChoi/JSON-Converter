import Image from "next/image";

export default function Footer(){
    return (
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center mt-10">
            <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://github.com/YoungHeonChoi/JSON-Converter"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    aria-hidden
                    src="/globe.svg"
                    alt="Globe icon"
                    width={16}
                    height={16}
                />
                Okerry Github →
            </a>
        </footer>
    );
}