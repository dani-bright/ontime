import * as React from 'react';


let ctx, x_end, y_end, bar_height;

// constants
const width = 300;
const height = window.innerHeight;
const bars = 200;
const bar_width = 2;
const radius = 0;
const center_x = width / 2;
const center_y = height / 2;

class Canvas extends React.PureComponent {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }


    animationLooper = (canvas) => {
        const {context} = this.props;
        canvas.width = width;
        canvas.height = height;

        ctx = canvas.getContext("2d");

        context.analyser.getByteTimeDomainData(context.frequency_array);
        //more precise
        // context.analyser.getByteFrequencyData(context.frequency_array);

        for (let i = 0; i < bars; i++) {
            const rads = Math.PI * 2 / bars;

            bar_height = context.frequency_array[i] * 0.8;

            const x = center_x + Math.cos(rads * i) * (radius);
            const y = center_y + Math.sin(rads * i) * (radius);
            x_end = center_x + Math.cos(rads * i) * (radius + bar_height);
            y_end = center_y + Math.sin(rads * i) * (radius + bar_height);

            if (context.frequency_array[i] > 250) {
                this.drawBar(x, y, x_end, y_end, context.frequency_array[i], ctx, canvas);
                this.drawBar(x, y, x_end, y_end, context.frequency_array[i], ctx, canvas);
                this.drawBar(x, y, x_end, y_end, context.frequency_array[i], ctx, canvas);
                this.drawBar(x, y, x_end, y_end, context.frequency_array[i], ctx, canvas);
                this.drawBar(x, y, x_end, y_end, context.frequency_array[i], ctx, canvas);
                this.drawBar(x, y, x_end, y_end, context.frequency_array[i], ctx, canvas);
                this.drawBar(x, y, x_end, y_end, context.frequency_array[i], ctx, canvas);
            } else {
                this.drawBar(x, y, x_end, y_end, context.frequency_array[i], ctx, canvas);
            }
        }
    };


    drawBar = (x1 = 0, y1 = 0, x2 = 0, y2 = 0, frequency, ctx, canvas) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "rgba(138, 225, 239, 1)");
        gradient.addColorStop(1, "rgba(70, 210, 222, 1)");

        ctx.fillStyle = gradient;

        const lineColor = "rgb(" + frequency + ", " + 210 + ", " + 233 + ")";
        const lineColor2 = "rgb(" + frequency + ", " + 84 + ", " + 246 + ")";
        if (frequency > 230) {
            ctx.strokeStyle = lineColor2
            ctx.lineWidth = 6
        } else {
            ctx.strokeStyle = lineColor
            ctx.lineWidth = bar_width
        }

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    };


    componentDidUpdate = () => {
        const {isPlaying} = this.props;
        if (isPlaying) {
            this.rafId = requestAnimationFrame(this.tick);
        } else {
            cancelAnimationFrame(this.rafId);
        }
    };

    tick = () => {
        const {context} = this.props;
        this.animationLooper(this.canvas.current);
        context.analyser.getByteTimeDomainData(context.frequency_array);
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
