function blockRect(r1, r2){
	// Catetos
	let catx = (r1.posX + r1.width / 2) - (r2.posX + r2.width / 2);
	let caty = (r1.posY + r1.height / 2) - (r2.posY + r2.height / 2);

	// Soma das metades
	let sumHafWidth = (r1.width / 2 ) + (r2.width / 2 );
	let sumHafHeight = (r1.height / 2 ) + (r2.height / 2 );

	if (Math.abs(catx) < sumHafWidth && Math.abs(caty) < sumHafHeight){
		let overlapX = sumHafWidth - Math.abs(catx);
		let overlapY = sumHafHeight - Math.abs(caty);

		if(overlapX >= overlapY){
			if(caty > 0){
				r1.posY += overlapY; // Aqui ta o segredo mlk
			} else {
				r1.posY -= overlapY;
			}
		} else {
			if (catx > 0) {
				r1.posX += overlapX;
			} else {
				r1.posX -= overlapX;
			}
		}
	}
}
