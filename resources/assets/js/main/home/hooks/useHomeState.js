import useShallowEqualSelector from '../../../shared/hooks/useShalloEqualSelector'

const useHomeState = (key) => useShallowEqualSelector((state) => state.homeList[key])

export default useHomeState
