import * as React from 'react';


let ctx, x_end, y_end, bar_height;

// constants
const width = 300;
const height = window.innerHeight;
const bars = 200;
const bar_width = 1;
const radius = 0;
const center_x = width / 2;
const center_y = height / 2;

class Canvas extends React.PureComponent {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.state = {
            context: null,
            source: null,
            analyser: null,
            frequency_array: null,
        }
    }


    animationLooper = (canvas) => {
        canvas.width = width;
        canvas.height = height;

        ctx = canvas.getContext("2d");

        this.state.analyser.getByteFrequencyData(this.state.frequency_array);
        for (var i = 0; i < bars; i++) {
            const rads = Math.PI * 2 / bars;

            bar_height = this.state.frequency_array[i] * 0.8;

            const x = center_x + Math.cos(rads * i) * (radius);
            const y = center_y + Math.sin(rads * i) * (radius);
            x_end = center_x + Math.cos(rads * i) * (radius + bar_height);
            y_end = center_y + Math.sin(rads * i) * (radius + bar_height);

            //draw a bar
            this.drawBar(x, y, x_end, y_end, this.state.frequency_array[i], ctx, canvas);
        }
    };


    drawBar = (x1 = 0, y1 = 0, x2 = 0, y2 = 0, frequency, ctx, canvas) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "rgba(138, 225, 239, 1)");
        gradient.addColorStop(1, "rgba(70, 210, 222, 1)");

        ctx.fillStyle = gradient;

        const lineColor = "rgb(" + frequency + ", " + 210 + ", " + 233 + ")";
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = bar_width;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    };

    componentDidMount = () => {
        const {context} = this.props;
        this.setState({
            context: context.context,
            source: context.source,
            analyser: context.analyser,
            frequency_array: context.frequency_array,
        }, () => {
            this.state.source.connect(this.state.analyser);
            this.state.analyser.connect(this.state.context.destination);
        })

    };


    componentDidUpdate = (prevProps, prevState, snapshot) => {
        const {isPlaying} = this.props;
        if (isPlaying) {
            this.rafId = requestAnimationFrame(this.tick);
        } else {
            cancelAnimationFrame(this.rafId);
        }
    };

    tick = () => {
        this.animationLooper(this.canvas.current);
        this.state.analyser.getByteTimeDomainData(this.state.frequency_array);
        this.rafId = requestAnimationFrame(this.tick);
    };

    componentWillUnmount = () => {
        cancelAnimationFrame(this.rafId);
    };

    render() {
        return <canvas ref={this.canvas} className={this.props.className}/>
    }
}


export default Canvas
