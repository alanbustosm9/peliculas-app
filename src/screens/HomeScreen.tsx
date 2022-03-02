import React from 'react'
import { ActivityIndicator, Dimensions, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { HorizontalSlider } from '../components/HorizontalSlider';

// esto es por si el width no va a cambiar nunca
const { width: windowWidth } = Dimensions.get('window')


export const HomeScreen = () => {
    
    // se desestructuran las props recibidas por el hook de useMovies
    const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies()
    const { top } = useSafeAreaInsets()
    // SE PUEDEN EXTRAER LAS DIMENSIONES SI VA A CAMBIAR DEL HOOK

    if ( isLoading ) {
        return (
            <View style={{ flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color="red" size={ 100 }/>
            </View>
        )
    }

    return (
        <ScrollView>
            <View style={{ marginTop: top + 20 }}>
                {/* Carousel de peliculas */}
                <View style={{ height: 440 }}>
                    <Carousel 
                        data={ nowPlaying }
                        renderItem={ ({ item }: any ) => <MoviePoster movie={ item } /> }
                        sliderWidth={ windowWidth }
                        itemWidth={ 300 }
                        inactiveSlideOpacity={ 0.9 }
                    />
                </View>

                {/* Peliculas populares */}
                <HorizontalSlider title="Popular" movies={ popular } />
                <HorizontalSlider title="Top Rated" movies={ topRated } />
                <HorizontalSlider title="Upcoming" movies={ upcoming } />

            </View>
        </ScrollView>
    )
}
