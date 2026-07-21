function _am8(r, q) {
	for (var s = 0; s < 8; s++) {
		var p = r + CY[s];
		var o = q + CX[s];
		if (p >= 0 && p < Y && o >= 0 && o < X) {
			d31[p][o][2]++
		}
	}
}
function $(a) {
	return document['getElementById'](a)
}

var d31 = [];
var X, Y, M;
var CX = [ - 1, -1, -1, 0, 0, 1, 1, 1];
var CY = [ - 1, 0, 1, -1, 1, -1, 0, 1];
var _gs;
function S98(k, l) {
	ctx['drawImage'](gfb[0], k * 25, l * 25);
	setTimeout(function() {
		if (d31[l][k][0] == 0) {
			ctx['drawImage'](gfs[0], k * 25, l * 25)
		}
	},
	120)
}
function c67(k, l) {
	var B = d31[l][k];
	if (B[0] != 1) {
		return
	};
	var D = 0,
	E = 0;
	for (var s = 0; s < 8; s++) {
		var p = l + CY[s];
		var o = k + CX[s];
		if (p >= 0 && p < Y && o >= 0 && o < X) {
			var C = d31[p][o];
			if (C[0] == 2) {
				D++
			} else {
				if (C[0] == 0) {
					if (C[1] == 1) {
						E++
					}
				}
			}
		}
	};
	var F = D >= B[2];
	if (F && E) {
		f17()
	} else {
		for (var s = 0; s < 8; s++) {
			var p = l + CY[s];
			var o = k + CX[s];
			if (p >= 0 && p < Y && o >= 0 && o < X) {
				if (d31[p][o][0] == 0) {
					if (F) {
						o0o(o, p)
					} else {
						S98(o, p)
					}
				}
			}
		}
	}
}
function f17() {
	_edn();
	$('face')['src'] = gif[2];
	_gs = 3;
	var k, l;
	for (l = 0; l < Y; l++) {
		for (k = 0; k < X; k++) {
			if (d31[l][k][0] == 0) {
				if (d31[l][k][1] == 1) {
					ctx['drawImage'](gfs[3], k * 25, l * 25)
				} else {}
			} else {
				if (d31[l][k][0] == 2) {
					if (d31[l][k][1] == 0) {
						h_f[f_n++] = setInterval(function(k, l) {
							var N = 0;
							return function() {
								ctx['drawImage'](N == 0 ? gfb[d31[l][k][2]] : gfs[1], k * 25, l * 25);
								N = !N
							}
						} (k, l), 800)
					} else {}
				}
			}
		}
	}
}
function o0o(k, l) {
	var Q = [k, l];
	while (Q['length']) {
		l = Q['pop']();
		k = Q['pop']();
		if (l < 0 || l >= Y || k < 0 || k >= X) {
			continue
		};
		var B = d31[l][k];
		if (B[0] != 0 && B[0] != 3) {
			continue
		};
		B[0] = 1;
		if (B[1] == 1) {
			ctx['drawImage'](gfs[2], k * 25, l * 25);
			f17();
			return
		};
		ctx['drawImage'](gfb[B[2]], k * 25, l * 25);
		RB--;
		if (RB == 0) {
			scs();
			return
		};
		if (B[2] == 0) {
			for (var s = 0; s < 8; s++) {
				var p = l + CY[s];
				var o = k + CX[s];
				if (p >= 0 && p < Y && o >= 0 && o < X) {
					if (d31[p][o][0] == 0) {
						d31[p][o][0] = 3;
						Q['push'](o, p)
					}
				}
			}
		}
	}
}
function scs() {
	_gs = 2;
	_edn();
	var k, l;
	for (l = 0; l < Y; l++) {
		for (k = 0; k < X; k++) {
			if (d31[l][k][0] == 0) {
				if (d31[l][k][1] != 1) {
					alert('bug 1')
				};
				ctx['drawImage'](gfs[1], k * 25, l * 25);
				d31[l][k][0] = 2;
				RM--
			}
		}
	};
	if (RM != 0) {
		alert('bug 2')
	};
	crm(0);
	$('face')['src'] = gif[1];
	up()
}
var _v;
function up() {
	if (_v > 3 && _t0 < 10) {
		return
	};
	var Z = un();
	if (Z == null) {
		getuid();
		return
	};
	var ba = _v + '\x1E' + Z + '\x1F' + _t0;
	if (_v > 3) {
		ba += '\x1F' + X + '\x1F' + Y + '\x1F' + M
	};
}
function DS(G) {
	var H = $(G);
	var J = H['getContext']('2d');
	var I = 3;
	return function(L) {
		var M0 = L;
		if (L < 10) {
			L = '00' + L
		} else {
			if (L < 100) {
				L = '0' + L
			} else {
				L = L['toString']()
			}
		};
		var K = L['length'];
		if (K != I) {
			H['width'] = K * 13;
			I = K
		};
		for (var f = 0; f < K; f++) {
			J['drawImage'](gfd[parseInt(L['charAt'](f))], f * 13, 0)
		};
		uih(G, M0)
	}
}
function uif(A) {
	A = parseInt(A, 10);
	if (isNaN(A) || A < 0) {
		A = 0
	};
	var B = Math['floor'](A / 60);
	var C = A % 60;
	return (B < 10 ? '0': '') + B + ':' + (C < 10 ? '0': '') + C
}
function uih(A, B) {
	if (A == 'rm' && $('grassMines')) {
		$('grassMines')['innerHTML'] = parseInt(B, 10) + ''
	};
	if (A == 'es' && $('grassTime')) {
		$('grassTime')['innerHTML'] = uif(B)
	}
}
var _classicGfs = gfs['slice'](0);
var _classicGfb = gfb['slice'](0);
var _grassTheme = null;
function _themeCanvas(A, B) {
	var C = document['createElement']('canvas');
	C['width'] = 25;
	C['height'] = 25;
	C['_uiSkin'] = B;
	A(C['getContext']('2d'));
	return C
}
function _grassCell(A) {
	var B = A['createRadialGradient'](10, 8, 3, 13, 13, 18);
	B['addColorStop'](0, '#6f8c38');
	B['addColorStop'](0.58, '#526f2b');
	B['addColorStop'](1, '#2f4a18');
	A['fillStyle'] = B;
	A['fillRect'](0, 0, 25, 25);
	A['fillStyle'] = 'rgba(206,229,126,0.12)';
	A['fillRect'](2, 2, 20, 1);
	A['fillRect'](2, 2, 1, 20);
	A['fillStyle'] = 'rgba(17,45,10,0.56)';
	A['fillRect'](0, 24, 25, 1);
	A['fillRect'](24, 0, 1, 25);
	A['fillStyle'] = 'rgba(255,255,255,0.035)';
	for (var B = 4; B < 24; B += 6) {
		A['fillRect'](B, 3, 1, 19);
		A['fillRect'](3, B, 19, 1)
	}
}
function _grassOpenCell(A) {
	A['fillStyle'] = '#536b2f';
	A['fillRect'](0, 0, 25, 25);
	A['fillStyle'] = 'rgba(117,146,66,0.55)';
	A['fillRect'](1, 1, 23, 1);
	A['fillRect'](1, 1, 1, 23);
	A['fillStyle'] = 'rgba(21,50,12,0.42)';
	A['fillRect'](0, 24, 25, 1);
	A['fillRect'](24, 0, 1, 25);
	A['fillStyle'] = 'rgba(20,50,13,0.18)';
	A['fillRect'](0, 0, 25, 1);
	A['fillRect'](0, 0, 1, 25);
	A['fillStyle'] = 'rgba(159,183,88,0.06)';
	A['fillRect'](4, 6, 15, 1);
	A['fillRect'](7, 15, 11, 1)
}
function _grassNumber(A, B) {
	_grassOpenCell(A);
	var C = ['#1f4bc9', '#12631d', '#b10f0f', '#441176', '#7d210f', '#007a7b', '#171717', '#5f5f5f'];
	A['fillStyle'] = C[B - 1] || '#171717';
	A['font'] = 'bold 16px Arial';
	A['textAlign'] = 'center';
	A['textBaseline'] = 'middle';
	A['fillText'](B + '', 12.5, 13.5)
}
function _ladybug(A, B) {
	_grassOpenCell(A);
	A['fillStyle'] = B;
	A['beginPath']();
	A['arc'](12.5, 13.2, 7.4, 0, Math['PI'] * 2, true);
	A['fill']();
	A['fillStyle'] = '#101010';
	A['beginPath']();
	A['arc'](12.5, 9.2, 2.4, 0, Math['PI'] * 2, true);
	A['fill']();
	A['fillRect'](12.1, 7.8, 0.8, 11);
	A['fillRect'](8.4, 11.2, 8.2, 0.9);
	A['fillRect'](7.5, 14.6, 4, 0.9);
	A['fillRect'](13.5, 14.6, 4, 0.9);
	A['fillRect'](6.9, 8.2, 3.8, 0.9);
	A['fillRect'](14.3, 8.2, 3.8, 0.9);
	A['fillStyle'] = '#101010';
	A['beginPath']();
	A['arc'](8.9, 12.4, 1.3, 0, Math['PI'] * 2, true);
	A['fill']();
	A['beginPath']();
	A['arc'](16.1, 12.4, 1.3, 0, Math['PI'] * 2, true);
	A['fill']();
	A['beginPath']();
	A['arc'](10.4, 16.7, 1.2, 0, Math['PI'] * 2, true);
	A['fill']();
	A['beginPath']();
	A['arc'](14.6, 16.7, 1.2, 0, Math['PI'] * 2, true);
	A['fill']();
	A['fillStyle'] = 'rgba(255,255,255,0.55)';
	A['fillRect'](8.8, 8.5, 2.4, 1.7)
}
function _grassFlag(A) {
	_ladybug(A, '#c92219');
	A['fillStyle'] = '#f4eacb';
	A['fillRect'](15.2, 7.2, 5.3, 3.1)
}
function _buildGrassTheme() {
	if (_grassTheme) {
		return _grassTheme
	};
	if (!document['createElement']) {
		_grassTheme = {
			gfs: _classicGfs,
			gfb: _classicGfb
		};
		return _grassTheme
	};
	var A = [];
	A[0] = _themeCanvas(function(B) {
		_grassCell(B)
	},
	'grass-cell');
	A[1] = _themeCanvas(function(B) {
		_grassFlag(B)
	},
	'grass-flag');
	A[2] = _themeCanvas(function(B) {
		_ladybug(B, '#8b1512')
	},
	'grass-explode');
	A[3] = _themeCanvas(function(B) {
		_ladybug(B, '#d52a1d')
	},
	'ladybug-mine');
	var C = [];
	C[0] = _themeCanvas(function(B) {
		_grassOpenCell(B)
	},
	'grass-open');
	for (var D = 1; D < 9; D++) {
		C[D] = _themeCanvas(function(B) {
			return function(E) {
				_grassNumber(E, B)
			}
		} (D),
		'grass-open-' + D)
	};
	_grassTheme = {
		gfs: A,
		gfb: C
	};
	return _grassTheme
}
function _applySkin(A) {
	if (A == 'grass') {
		var B = _buildGrassTheme();
		gfs = B['gfs'];
		gfb = B['gfb']
	} else {
		gfs = _classicGfs;
		gfb = _classicGfb
	}
}
function _repaintBoard() {
	if (!ctx || !d31['length']) {
		return
	};
	for (var A = 0; A < Y; A++) {
		for (var B = 0; B < X; B++) {
			var C = d31[A][B];
			if (C[0] == 0) {
				ctx['drawImage'](gfs[0], B * 25, A * 25)
			} else {
				if (C[0] == 2) {
					if (_gs == 3 && C[1] == 0) {
						ctx['drawImage'](gfs[2], B * 25, A * 25)
					} else {
						ctx['drawImage'](gfs[1], B * 25, A * 25)
					}
				} else {
					if (C[1] == 1) {
						ctx['drawImage'](gfs[3], B * 25, A * 25)
					} else {
						ctx['drawImage'](gfb[C[2]], B * 25, A * 25)
					}
				}
			}
		}
	};
	crm(RM);
	ces(typeof e33 == 'undefined' ? 0: e33)
}
function _gnt() {
	for (var l = 0; l < Y; l++) {
		d31[l] = [];
		for (var k = 0; k < X; k++) {
			d31[l][k] = [0, 0, 0]
		}
	};
	for (var w = 0; w < M; w++) {
		do {
			rx = _r39(X);
			ry = _r39(Y)
		} while ( d31 [ ry ][rx][1] == 1);;
		d31[ry][rx][1] = 1;
		_am8(ry, rx)
	};
	RM = M;
	RB = X * Y - M
}
var h_f = [];
var f_n = 0;
function _45() {
	if (he > 0) {
		clearInterval(he);
		he = 0
	};
	for (var f = 0; f < f_n; f++) {
		clearInterval(h_f[f])
	};
	f_n = 0;
	_gnt();
	_d46();
	_x0 = -1;
	_y0 = -1;
	sopen();
	_gs = 0
}
var _mp1, _mp2;
var paf = $('paf');
var ctx = paf['getContext']('2d');
var crm = DS('rm');
var ces = DS('es');
var _x0;
var _y0;
function _65(g) {
	if (_tch || _gs > 1) {
		return
	};
	var h = paf['getBoundingClientRect']();
	var k = Math['floor']((g['clientX'] - h['left']) / 25);
	var l = Math['floor']((g['clientY'] - h['top']) / 25);
	_x0 = k;
	_y0 = l;
	var j = d31[l][k][0];
	if (_gs == 0) {
		_es()
	};
	if (g['button'] == 2) {
		if (_mp2 != 1) {
			if (j == 1) {
				c67(k, l)
			} else {
				M5k(k, l)
			}
		}
	} else {
		if (_mp1 != 1) {
			if (j == 1) {
				c67(k, l)
			} else {
				if (j == 2) {
					M5k(k, l)
				} else {
					o0o(k, l)
				}
			}
		}
	}
}
function _67(g) {
	if (_tch || _gs > 1) {
		return
	};
	var h = paf['getBoundingClientRect']();
	var k = Math['floor']((g['clientX'] - h['left']) / 25);
	var l = Math['floor']((g['clientY'] - h['top']) / 25);
	var j = d31[l][k][0];
	if (g['button'] == 2) {
		if (_mp2 != null) {
			if (_mp2 == 2 && k == _x0 && l == _y0) {
				return
			};
			if (j == 1) {
				c67(k, l)
			} else {
				M5k(k, l)
			}
		}
	} else {
		if (_mp1 != null) {
			if (_mp1 == 2 && k == _x0 && l == _y0) {
				return
			};
			if (j == 1) {
				c67(k, l)
			} else {
				if (j == 2) {
					M5k(k, l)
				} else {
					o0o(k, l)
				}
			}
		}
	}
}
function _txy(g, A) {
	if (!g[A] || !g[A][0]) {
		return null
	};
	var h = paf['getBoundingClientRect']();
	var k = Math['floor']((g[A][0]['clientX'] - h['left']) / 25);
	var l = Math['floor']((g[A][0]['clientY'] - h['top']) / 25);
	if (k < 0 || k >= X || l < 0 || l >= Y) {
		return null
	};
	return [k, l]
}
function _77(g) {
	if (_gs > 1) {
		return
	};
	_tch = 1;
	clearTimeout(_hl);
	var xy = _txy(g, 'touches');
	if (xy == null) {
		return
	};
	var k = xy[0];
	var l = xy[1];
	_x0 = k;
	_y0 = l;
	if (d31[l][k][0] == 1) {
		c67(k, l);
		_tch = 3
	} else {
		_hl = setTimeout(function() {
			return lgt(k, l)
		},
		500)
	}
}
var _hl;
function lgt(k, l) {
	if (_gs > 1 || l < 0 || l >= Y || k < 0 || k >= X) {
		return
	};
	_tch = 3;
	var j = d31[l][k][0];
	if (_gs == 0 && j != 2) {
		_es()
	};
	if (j != 2) {
		if (j == 1) {
			c67(k, l)
		} else {
			o0o(k, l)
		}
	}
}
var tc0 = 0;
function _75(g) {
	if (_tch == 1) {
		var xy = _txy(g, 'changedTouches');
		if (xy != null) {
			var k = xy[0];
			var l = xy[1];
			if (k == _x0 && l == _y0) {
				var j = d31[l][k][0];
				if (_gs == 0 && j != 2) {
					_es()
				};
				if (j == 1) {
					c67(k, l)
				} else {
					if (j == 0 || j == 2) {
						M5k(k, l)
					}
				}
			}
		};
		_tch = 3;
		clearTimeout(_hl)
	};
	if (_tch == 3 && g['preventDefault']) {
		g['preventDefault']()
	} else if (_tch == 3) {
		window['event']['returnValue'] = false
	}
}
function _dcb() {
	var A = X * 25;
	if (document['createElement'] && X > 1 && Y > 1) {
		var B = document['createElement']('canvas');
		B['width'] = A;
		B['height'] = 25;
		var C = B['getContext']('2d');
		for (var f = 0; f < X; f++) {
			C['drawImage'](gfs[0], f * 25, 0)
		};
		for (var t = 0; t < Y; t++) {
			ctx['drawImage'](B, 0, t * 25)
		};
		return
	};
	for (var f = 0; f < X; f++) {
		for (var t = 0; t < Y; t++) {
			ctx['drawImage'](gfs[0], f * 25, t * 25)
		}
	}
}
function _d46() {
	_edn();
	he = 0;
	_tch = 0;
	_mp1 = localStorage['getItem']('mp1');
	_mp2 = localStorage['getItem']('mp2');
	_tpn = localStorage['getItem']('tpn');
	_opn = localStorage['getItem']('opn');
	var u = X * 25;
	$('p42')['style']['width'] = u + 4 + 'px';
	paf['width'] = u;
	paf['height'] = Y * 25;
	$('face')['src'] = gif[0];
	_dcb();
	paf['onmousedown'] = function(g) {
		_65(g)
	};
	paf['onmouseup'] = function(g) {
		_67(g)
	};;;
	paf['ontouchstart'] = function(g) {
		_77(g)
	};
	paf['ontouchmove'] = function() {
		_tch = 2;
		clearTimeout(_hl)
	};
	paf['ontouchend'] = function(g) {
		_75(g)
	};
	crm(RM);
	ces(0)
}
document['oncontextmenu'] = function() {
	return false
};
document['onselectstart'] = function() {
	return false
};
function sopen() {
	var T = 0;
	var U = -1,
	V = -1;
	for (var f = 0; f < X; f++) {
		var W = 0;
		for (var t = 0; t < Y; t++) {
			if (d31[t][f][2] == 0 && d31[t][f][1] == 0) {
				W++
			} else {
				if (W > T) {
					T = W;
					U = f;
					V = t - 1
				};
				W = 0
			}
		};
		if (W > T) {
			T = W;
			U = f;
			V = t - 1
		}
	};
	if (U >= 0 && V >= 0) {
		o0o(U, V)
	}
}
function _r39(A) {
	return Math['floor'](Math['random']() * A)
}
function _cm9(A) {
	var B = parseInt(A, 10);
	if (isNaN(B) || B < 1) {
		B = 1
	};
	var C;
	if (B >= 99) {
		C = B / 0.20625
	} else {
		C = (-720 + Math['sqrt'](518400 + 23040 * B)) / 2
	};
	C = Math['max'](81, Math['ceil'](C), B + 1);
	var D = window['innerWidth'] || document['body']['clientWidth'] || 1020;
	var E = window['innerHeight'] || document['body']['clientHeight'] || 768;
	var F = (D - 18) / (E - 54);
	if (!isFinite(F) || F <= 0) {
		F = 1
	};
	var G = Math['ceil'](Math['sqrt'](C * F));
	var H = Math['ceil'](C / G);
	if (G < 9) {
		G = 9
	};
	if (H < 9) {
		H = 9
	};
	while (G * H <= B) {
		if (G <= H) {
			G++
		} else {
			H++
		}
	};
	return [G, H, B]
}
function udp() {
	var ca = _cm9($('mm')['value']);
	$('hm')['value'] = ca[0] + '';
	$('vm')['value'] = ca[1] + '';
	$('dfp')['innerHTML'] = '范围：' + ca[0] + '×' + ca[1]
}
function _edn() {
	if (he > 0) {
		clearInterval(he);
		he = 0;
		_t0 = Date['now']() - _t0;
		ces(parseInt(_t0 / 1000));
		_t0 = Math['ceil'](_t0 / 100)
	} else {
		_t0 = 0
	}
}
var he = 0;
var _t0;
var e33;
function _es() {
	_t0 = Date['now']();
	e33 = 0;
	_gs = 1;
	he = setInterval(function() {
		ces(++e33)
	},
	1000)
}
var _tpn;
var _opn;
var _tch;
_h = window['location']['href'];
var RM;
var RB;
function M5k(k, l) {
	if (d31[l][k][0] == 0) {
		if (RM > 0) {
			ctx['drawImage'](gfs[1], k * 25, l * 25);
			d31[l][k][0] = 2;
			crm(--RM)
		}
	} else {
		if (d31[l][k][0] == 2) {
			ctx['drawImage'](gfs[0], k * 25, l * 25);
			d31[l][k][0] = 0;
			crm(++RM)
		}
	}
}
var df5 = localStorage['getItem']('df5');
if (df5 == null) {
	$('mm')['value'] = 20;
	var cz = _cm9(20);
	$('hm')['value'] = cz[0] + '';
	$('vm')['value'] = cz[1] + ''
} else {
	var cv = df5['split'](';');
	if (cv['length'] > 2) {
		$('hm')['value'] = cv[0];
		$('vm')['value'] = cv[1];
		$('mm')['value'] = cv[2]
	} else {
		$('mm')['value'] = cv[0];
		var cz = _cm9(cv[0]);
		$('hm')['value'] = cz[0] + '';
		$('vm')['value'] = cz[1] + ''
	}
};
udp();
function start() {
	uit('classic');
	_123(localStorage['getItem']('ch7'));
	on();
	sid();
	ad()
}
function uit(A) {
	var B = A == 'grass';
	_applySkin(B ? 'grass': 'classic');
	document['body']['className'] = B ? 'ui-grass': '';
	if ($('uiToggle')) {
		$('uiToggle')['innerHTML'] = B ? '经典版': '新版UI'
	};
	localStorage['setItem']('ui7', B ? 'grass': 'classic');
	uih('rm', typeof RM == 'undefined' ? 0: RM);
	uih('es', typeof e33 == 'undefined' ? 0: e33);
	_repaintBoard()
}
function tui() {
	uit(document['body']['className'] == 'ui-grass' ? 'classic': 'grass')
}
function un() {
	var Z = localStorage['getItem']('uid');
	if (Z != null) {
		var S = Z['split']('.');
		if (S['length'] > 1) {
			Z = S[0];
			localStorage['setItem']('uid', Z)
		};
		if (Z['length'] < 2 || isNaN(Z)) {
			Z = null
		}
	};
	return Z
}
function sid() {
	$('uid')['innerHTML'] = un()
}
function on() {
	setTimeout(on, 180000)
}
function getuid() {
	sid();
}
function _123(d) {
	var c = document['body']['clientWidth'];
	var b = document['body']['clientHeight'];
	if (d == null) {
		d = c < 560 ? 1 : 2
	};
	_v = d;
	$('custom')['style']['display'] = d == 5 ? '': 'none';
	if (d == 1) {
		X = 9;
		Y = 9;
		M = 10
	} else {
		if (d == 2) {
			X = 16;
			Y = 16;
			M = 40
		} else {
			if (d == 3) {
				M = 99;
				if (c >= b) {
					X = 30;
					Y = 16
				} else {
					X = 16;
					Y = 30
				}
			} else {
				if (d == 4) {
					X = parseInt((c - 18) / 25);
					Y = parseInt((b - 54) / 25);
					var e = X * Y;
					if (e >= 480) {
						M = e * 0.20625
					} else {
						M = e * e / 5760 + e / 8
					};
					M = parseInt(M)
				} else {
					if (d == 5) {
						var cz = _cm9($('mm')['value']);
						X = cz[0];
						Y = cz[1];
						M = cz[2];
						$('hm')['value'] = X + '';
						$('vm')['value'] = Y + '';
						$('mm')['value'] = M + '';
						udp()
					} else {
						return
					}
				}
			}
		}
	};
	_45();
	localStorage['setItem']('ch7', d);
	$('ss')['href'] = 'scores.htm#' + _v
}
function udf() {
	_123(5);
	localStorage['setItem']('df5', $('hm')['value'] + ';' + $('vm')['value'] + ';' + $('mm')['value'])
}
