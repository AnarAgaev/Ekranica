import $ from "jquery";

$(document).ready(function () {
    if ( $('.page-index')[0] ) {
        // Animation for mobile
        let wMobi = cMob.width = 320,
            hMobi = cMob.height = 500,
            ctxMobi = cMob.getContext( '2d' ),

            optsMobi = {

                side: 6,
                distance: 11,
                depthZ: 100,
                depthY: 70,
                particleRadius: 1,
                fillColor: 'rgba(171,120,255,alp)',
                strokeColor: '#A3A3A3',
                rotYVel: .009,

                focalLength: 270,
                vanishPoint: {

                    x: wMobi / 2,
                    y: hMobi / 2 - hMobi / 2
                }
            },

            rotYMobi = 0,
            tickMobi = 0;

        function animMobi(){

            window.requestAnimationFrame( animMobi );

            ++tickMobi;
            rotYMobi += optsMobi.rotYVel;

            let cos = Math.cos( rotYMobi ),
                sin = Math.sin( rotYMobi );

            ctxMobi.fillStyle = '#0B0D19';
            ctxMobi.fillRect( 0, 0, wMobi, hMobi );

            for (let i = 0; i < optsMobi.side; ++i )
                for (let j = 0; j < optsMobi.side; ++j )
                    for (let k = 0; k < optsMobi.side; ++k ) {

                        let x = ( i - optsMobi.side / 2 ) * optsMobi.distance,
                            y = ( j - optsMobi.side / 2 ) * optsMobi.distance,
                            z = ( k - optsMobi.side / 2 ) * optsMobi.distance,
                            filled = Math.sin( ( tickMobi + x + z + y ) / 30 ) * optsMobi.side < i && Math.sin( ( tickMobi + x + z + y ) / 30 ) * optsMobi.side > i - 5 ;

                        let x1 = x;
                        x = x * cos - z * sin;
                        z = z * cos + x1 * sin;

                        z += optsMobi.depthZ;
                        y += optsMobi.depthY;

                        let scale = optsMobi.focalLength / z,
                            screenX = optsMobi.vanishPoint.x + x * scale,
                            screenY = optsMobi.vanishPoint.y + y * scale;

                        ctxMobi.beginPath();

                        if ( filled ) {

                            ctxMobi.arc( screenX, screenY, scale * optsMobi.particleRadius * 2, 0, Math.PI * 2 );

                            let gradient = ctxMobi.createRadialGradient( screenX, screenY, 0, screenX, screenY, scale * optsMobi.particleRadius * 2 );
                            gradient.addColorStop( 0, optsMobi.fillColor.replace( 'alp', 1 ) );
                            gradient.addColorStop( 1, optsMobi.fillColor.replace( 'alp', 0 ) );

                            ctxMobi.fillStyle = gradient;
                            ctxMobi.fill();
                        } else {

                            ctxMobi.arc( screenX, screenY, scale * optsMobi.particleRadius, 0, Math.PI * 2 )

                            ctxMobi.lineWidth = scale / 20;
                            ctxMobi.strokeStyle = optsMobi.strokeColor;
                            ctxMobi.stroke();
                        }
                    }
        }
        animMobi();


        // Animation for tablet
        let wTab = cTab.width = 700,
            hTab = cTab.height = 1000,
            ctxTab = cTab.getContext( '2d' ),

            optsTab = {

                side: 7,
                distance: 11,
                depthZ: 100,
                depthY: 70,
                particleRadius: 1,
                fillColor: 'rgba(171,120,255,alp)',
                strokeColor: '#A3A3A3',
                rotYVel: .009,

                focalLength: 270,
                vanishPoint: {

                    x: wTab / 2,
                    y: hTab / 2 - hTab / 2
                }
            },

            rotYTab = 0,
            tickTab = 0;

        function animTab(){

            window.requestAnimationFrame( animTab );

            ++tickTab;
            rotYTab += optsTab.rotYVel;

            let cos = Math.cos( rotYTab ),
                sin = Math.sin( rotYTab );

            ctxTab.fillStyle = '#0B0D19';
            ctxTab.fillRect( 0, 0, wTab, hTab );

            for (let i = 0; i < optsTab.side; ++i )
                for (let j = 0; j < optsTab.side; ++j )
                    for (let k = 0; k < optsTab.side; ++k ) {

                        let x = ( i - optsTab.side / 2 ) * optsTab.distance,
                            y = ( j - optsTab.side / 2 ) * optsTab.distance,
                            z = ( k - optsTab.side / 2 ) * optsTab.distance,
                            filled = Math.sin( ( tickTab + x + z + y ) / 30 ) * optsTab.side < i && Math.sin( ( tickTab + x + z + y ) / 30 ) * optsTab.side > i - 5 ;

                        let x1 = x;
                        x = x * cos - z * sin;
                        z = z * cos + x1 * sin;

                        z += optsTab.depthZ;
                        y += optsTab.depthY;

                        let scale = optsTab.focalLength / z,
                            screenX = optsTab.vanishPoint.x + x * scale,
                            screenY = optsTab.vanishPoint.y + y * scale;

                        ctxTab.beginPath();

                        if ( filled ) {

                            ctxTab.arc( screenX, screenY, scale * optsTab.particleRadius * 2, 0, Math.PI * 2 );

                            let gradient = ctxTab.createRadialGradient( screenX, screenY, 0, screenX, screenY, scale * optsTab.particleRadius * 2 );
                            gradient.addColorStop( 0, optsTab.fillColor.replace( 'alp', 1 ) );
                            gradient.addColorStop( 1, optsTab.fillColor.replace( 'alp', 0 ) );

                            ctxTab.fillStyle = gradient;
                            ctxTab.fill();
                        } else {

                            ctxTab.arc( screenX, screenY, scale * optsTab.particleRadius, 0, Math.PI * 2 )

                            ctxTab.lineWidth = scale / 20;
                            ctxTab.strokeStyle = optsTab.strokeColor;
                            ctxTab.stroke();
                        }
                    }
        }
        animTab();


        // Animation for desktop
        let wDesk = cDesk.width = 1056, //1100,
            hDesk = cDesk.height = 1500, //1700,
            ctxDesk = cDesk.getContext( '2d' ),

            optsDesk = {

                side: 8,
                distance: 11,
                depthZ: 100,
                depthY: 70,
                particleRadius: 1,
                fillColor: 'rgba(171,120,255,alp)',
                strokeColor: '#A3A3A3',
                rotYVel: .009,

                focalLength: 270,
                vanishPoint: {

                    x: wDesk / 2,
                    y: hDesk / 2 - hDesk / 2
                }
            },

            rotYDesk = 0,
            tickDesk = 0;

        function animDesk(){

            window.requestAnimationFrame( animDesk );

            ++tickDesk;
            rotYDesk += optsDesk.rotYVel;

            let cos = Math.cos( rotYDesk ),
                sin = Math.sin( rotYDesk );

            ctxDesk.fillStyle = '#0B0D19';
            ctxDesk.fillRect( 0, 0, wDesk, hDesk );

            for (let i = 0; i < optsDesk.side; ++i )
                for (let j = 0; j < optsDesk.side; ++j )
                    for (let k = 0; k < optsDesk.side; ++k ) {

                        let x = ( i - optsDesk.side / 2 ) * optsDesk.distance,
                            y = ( j - optsDesk.side / 2 ) * optsDesk.distance,
                            z = ( k - optsDesk.side / 2 ) * optsDesk.distance,
                            filled = Math.sin( ( tickDesk + x + z + y ) / 30 ) * optsDesk.side < i && Math.sin( ( tickDesk + x + z + y ) / 30 ) * optsDesk.side > i - 5 ;

                        let x1 = x;
                        x = x * cos - z * sin;
                        z = z * cos + x1 * sin;

                        z += optsDesk.depthZ;
                        y += optsDesk.depthY;

                        let scale = optsDesk.focalLength / z,
                            screenX = optsDesk.vanishPoint.x + x * scale,
                            screenY = optsDesk.vanishPoint.y + y * scale;

                        ctxDesk.beginPath();

                        if ( filled ) {

                            ctxDesk.arc( screenX, screenY, scale * optsDesk.particleRadius * 2, 0, Math.PI * 2 );

                            let gradient = ctxDesk.createRadialGradient( screenX, screenY, 0, screenX, screenY, scale * optsDesk.particleRadius * 2 );
                            gradient.addColorStop( 0, optsDesk.fillColor.replace( 'alp', 1 ) );
                            gradient.addColorStop( 1, optsDesk.fillColor.replace( 'alp', 0 ) );

                            ctxDesk.fillStyle = gradient;
                            ctxDesk.fill();
                        } else {

                            ctxDesk.arc( screenX, screenY, scale * optsDesk.particleRadius, 0, Math.PI * 2 )

                            ctxDesk.lineWidth = scale / 20;
                            ctxDesk.strokeStyle = optsDesk.strokeColor;
                            ctxDesk.stroke();
                        }
                    }
        }
        animDesk();
    }
});