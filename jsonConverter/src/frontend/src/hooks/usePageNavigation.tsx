import {useRouter} from "next/navigation";

/*
* 페이지 이동을 위한 커스텀 훅
*/
export const usePageNavigation = () => {
    const route = useRouter();

    const navigateTo = (path) => {
        route.push(path);
    };

    return { navigateTo }
}