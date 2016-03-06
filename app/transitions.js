export default function(){
  this.transition(
  	this.hasClass('search'),
    this.toValue(true),
    this.use('toDown', {duration: 200}),
    this.reverse('toUp', {duration: 200})
  );
}